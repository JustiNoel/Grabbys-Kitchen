import { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useReviews, useCreateReview } from '@/hooks/useReviews';
import { format } from 'date-fns';

const ReviewsSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: reviews = [], isLoading } = useReviews();
  const createReview = useCreateReview();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to leave a review",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReview.mutateAsync({
        rating,
        comment,
        reviewerName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Guest',
      });
      
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your experience",
      });
      
      setComment('');
      setRating(5);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive",
      });
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <section id="reviews" className="py-20 bg-muted/30 pattern-african">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our valued customers about their dining experiences
          </p>
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(Number(averageRating))
                        ? 'text-accent fill-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">{averageRating}</span>
              <span className="text-muted-foreground">({reviews.length} reviews)</span>
            </div>
          )}
        </div>

        {/* Review Form */}
        <Card className="max-w-2xl mx-auto mb-12 bg-card/80 backdrop-blur-sm border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-semibold mb-4 text-foreground">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredStar || rating)
                            ? 'text-accent fill-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Your Review</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your dining experience..."
                  className="min-h-[100px] bg-background/50"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={createReview.isPending || !user}
              >
                {!user ? 'Sign in to Review' : createReview.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted-foreground">No reviews yet. Be the first to share your experience!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <Card 
                key={review.id} 
                className="bg-card/80 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-accent fill-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 line-clamp-4">{review.comment}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="font-medium text-foreground">{review.reviewer_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(review.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
