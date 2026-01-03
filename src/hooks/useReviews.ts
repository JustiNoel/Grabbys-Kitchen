import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface Review {
  id: string;
  user_id: string | null;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (reviewData: {
      rating: number;
      comment: string;
      reviewerName: string;
    }) => {
      if (!user) throw new Error('Must be logged in to leave a review');
      
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          reviewer_name: reviewData.reviewerName,
          rating: reviewData.rating,
          comment: reviewData.comment,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
