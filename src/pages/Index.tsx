import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import OrderTracker from '@/components/OrderTracker';
import ReviewsSection from '@/components/ReviewsSection';
import ReservationForm from '@/components/ReservationForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <OrderTracker />
        <MenuSection />
        <ReviewsSection />
        <ReservationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
