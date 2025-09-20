import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home, Calculator } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  // Define page names and their corresponding display names
  const pageNames = {
    'body-fat-calculator': 'Body Fat Calculator',
    'army-body-fat-calculator': 'Army Body Fat Calculator',
    'lean-body-mass-calculator': 'Lean Body Mass Calculator',
    'ideal-weight-calculator': 'Ideal Weight Calculator',
    'healthy-weight-calculator': 'Healthy Weight Calculator',
    'body-type-calculator': 'Body Type Calculator',
    'body-surface-area-calculator': 'Body Surface Area Calculator',
    'calorie-calculator': 'Calorie Calculator',
    'tdee-calculator': 'Total Daily Energy Expenditure Calculator',
    'bmr-calculator': 'Basal Metabolic Rate Calculator',
    'macro-calculator': 'Macro Calculator',
    'carbohydrate-calculator': 'Carbohydrate Calculator',
    'protein-calculator': 'Protein Calculator',
    'fat-intake-calculator': 'Fat Intake Calculator',
    'pace-calculator': 'Pace Calculator',
    'calories-burned-calculator': 'Calories Burned Calculator',
    'one-rep-max-calculator': 'One Rep Max Calculator',
    'target-heart-rate-calculator': 'Target Heart Rate Calculator',
    'pregnancy-calculator': 'Pregnancy Calculator',
    'pregnancy-weight-gain-calculator': 'Pregnancy Weight Gain Calculator',
    'due-date-calculator': 'Due Date Calculator',
    'ovulation-calculator': 'Ovulation Calculator',
    'conception-calculator': 'Conception Calculator',
    'period-calculator': 'Period Calculator',
    'gfr-calculator': 'GFR Calculator',
    'bac-calculator': 'BAC Calculator',
    'privacy-policy': 'Privacy Policy',
    'terms-conditions': 'Terms & Conditions',
    'contact-us': 'Contact Us'
  };

  // Define categories for grouping
  const categoryMap = {
    'body-fat-calculator': 'Body Composition',
    'army-body-fat-calculator': 'Body Composition',
    'lean-body-mass-calculator': 'Body Composition',
    'ideal-weight-calculator': 'Body Composition',
    'healthy-weight-calculator': 'Body Composition',
    'body-type-calculator': 'Body Composition',
    'body-surface-area-calculator': 'Body Composition',
    'calorie-calculator': 'Nutrition & Diet',
    'tdee-calculator': 'Nutrition & Diet',
    'bmr-calculator': 'Nutrition & Diet',
    'macro-calculator': 'Nutrition & Diet',
    'carbohydrate-calculator': 'Nutrition & Diet',
    'protein-calculator': 'Nutrition & Diet',
    'fat-intake-calculator': 'Nutrition & Diet',
    'pace-calculator': 'Fitness & Performance',
    'calories-burned-calculator': 'Fitness & Performance',
    'one-rep-max-calculator': 'Fitness & Performance',
    'target-heart-rate-calculator': 'Fitness & Performance',
    'pregnancy-calculator': 'Pregnancy & Women\'s Health',
    'pregnancy-weight-gain-calculator': 'Pregnancy & Women\'s Health',
    'due-date-calculator': 'Pregnancy & Women\'s Health',
    'ovulation-calculator': 'Pregnancy & Women\'s Health',
    'conception-calculator': 'Pregnancy & Women\'s Health',
    'period-calculator': 'Pregnancy & Women\'s Health',
    'gfr-calculator': 'Medical & Health',
    'bac-calculator': 'Medical & Health',
    'privacy-policy': 'Legal & Support',
    'terms-conditions': 'Legal & Support',
    'contact-us': 'Legal & Support'
  };

  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null;
  }

  const buildBreadcrumb = () => {
    const breadcrumbItems = [
      {
        name: 'Home',
        path: '/',
        icon: Home
      }
    ];

    if (pathSegments.length > 0) {
      const currentPage = pathSegments[0];
      const category = categoryMap[currentPage];
      
      // Add category if it exists and is not the same as the page
      if (category && category !== pageNames[currentPage]) {
        breadcrumbItems.push({
          name: category,
          path: '#',
          isCategory: true,
          icon: Calculator
        });
      }

      // Add current page
      breadcrumbItems.push({
        name: pageNames[currentPage] || currentPage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        path: location.pathname,
        isCurrent: true,
        icon: Calculator
      });
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = buildBreadcrumb();

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-900/30 border-b border-gray-800/50 py-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm overflow-x-auto scrollbar-none">
          <ol className="flex items-center space-x-2 min-w-0 flex-nowrap">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center flex-shrink-0">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-500 mx-2 flex-shrink-0" />
                )}
                
                {item.isCurrent ? (
                  <span className="flex items-center text-blue-400 font-medium">
                    <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate max-w-32 sm:max-w-48 md:max-w-64 lg:max-w-none">
                      {item.name}
                    </span>
                  </span>
                ) : item.isCategory ? (
                  <span className="flex items-center text-gray-400 font-medium">
                    <item.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate max-w-24 sm:max-w-32 md:max-w-48">
                      {item.name}
                    </span>
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <item.icon className="h-4 w-4 mr-2 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                    <span className="truncate max-w-16 sm:max-w-24 hover:underline">
                      {item.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;