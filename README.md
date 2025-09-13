# Advanced BMI Calculator

A comprehensive, modern BMI (Body Mass Index) calculator with advanced health insights, built with React and featuring a beautiful glassmorphism UI design.

## 🌟 Features

### Core Functionality
- **Advanced BMI Calculation**: Supports both metric and imperial units
- **Body Fat Estimation**: Uses the Deurenberg formula for accurate body fat percentage
- **Ideal Weight Calculator**: Calculates ideal weight using Devine formula with age/gender adjustments
- **Health Recommendations**: Personalized suggestions based on BMI, body fat, age, and gender

### User Experience
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Local Storage**: Automatic saving of calculations, goals, and preferences

### Advanced Features
- **BMI History Tracking**: Save and visualize your BMI progress over time
- **Goal Setting**: Set weight loss, weight gain, or BMI target goals
- **Progress Analytics**: Track trends and achievements
- **Multiple Units**: Switch between metric (kg/cm) and imperial (lbs/inches)

## 🚀 SEO Optimizations

- **Complete Meta Tags**: Comprehensive SEO meta tags and Open Graph data
- **Structured Data**: Schema.org markup for rich snippets
- **Sitemap & Robots.txt**: Search engine optimization files
- **AdSense Ready**: Pre-configured for Google AdSense integration

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablet screens
- **Desktop Excellence**: Full-featured desktop experience

## 🎨 Design Features

- **Glass Morphism**: Modern frosted glass effect
- **Smooth Animations**: Micro-interactions and hover effects
- **Color Theory**: Carefully selected color palettes
- **Typography**: Clean, readable font hierarchy

## 🛠️ Technologies Used

- **Frontend**: React 19, React Router DOM
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React icons
- **State Management**: React Context API
- **Local Storage**: Browser localStorage for data persistence

## 📊 Health Calculations

### BMI Categories
- Underweight: < 18.5
- Normal weight: 18.5-24.9
- Overweight: 25-29.9
- Obesity Class 1: 30-34.9
- Obesity Class 2: 35-39.9
- Obesity Class 3: ≥ 40

### Body Fat Estimation
Uses the Deurenberg formula:
- **Men**: (1.20 × BMI) + (0.23 × Age) - 16.2
- **Women**: (1.20 × BMI) + (0.23 × Age) - 5.4

### Ideal Weight Calculation
Uses the Devine formula with age adjustments:
- **Men**: 50 + 2.3 × (height in inches - 60) + age factor
- **Women**: 45.5 + 2.3 × (height in inches - 60) + age factor

## 🔧 Installation & Setup

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`
4. Open http://localhost:3000 in your browser

## 📈 AdSense Integration

The application is pre-configured for Google AdSense:

1. Update `/public/ads.txt` with your AdSense publisher ID
2. Add AdSense ad units to components as needed
3. The clean, content-rich design is AdSense-friendly

## 🎯 Future Enhancements

- BMI charts and graphs
- Export BMI reports
- Social sharing features
- Multiple language support
- Integration with fitness trackers

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for better health awareness and fitness tracking.