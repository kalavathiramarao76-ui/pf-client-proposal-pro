import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PricingPlan } from '../types';
import Layout from '../layout';
import PricingPlanCard from '../components/PricingPlanCard';

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: 'Free',
    price: 0,
    features: ['Up to 5 proposals', 'Limited analytics', 'Basic support'],
  },
  {
    id: 2,
    name: 'Pro',
    price: 19.99,
    features: ['Up to 50 proposals', 'Advanced analytics', 'Priority support'],
  },
  {
    id: 3,
    name: 'Business',
    price: 49.99,
    features: ['Unlimited proposals', 'Custom analytics', 'Dedicated support'],
  },
];

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const router = useRouter();

  const handlePlanSelect = (plan: PricingPlan) => {
    setSelectedPlan(plan);
  };

  const handleUpgrade = () => {
    if (selectedPlan) {
      // Upgrade logic using localStorage
      localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
      router.push('/settings');
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Pricing</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Choose a plan that fits your needs
        </p>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingPlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan}
              onSelect={() => handlePlanSelect(plan)}
            />
          ))}
        </div>
        {selectedPlan && (
          <div className="mt-8">
            <button
              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 py-2 px-4 rounded"
              onClick={handleUpgrade}
            >
              Upgrade to {selectedPlan.name}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PricingPage;