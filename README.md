# Cosmic AWS Monitor

A beautiful, space-themed dashboard for monitoring AWS EC2 instances across multiple accounts. Built with React, TypeScript, and Tailwind CSS.

![Dashboard Preview](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072)

## Features

- 🚀 **Real-time Instance Monitoring**
  - CPU and Memory usage visualization
  - Instance state tracking
  - Uptime monitoring
  - Cost tracking per instance

- 🔄 **Smart Auto-refresh**
  - Configurable intervals (5s, 30s, 1m, 2m, 5m)
  - Visual refresh indicators
  - Last update timestamp

- 🎯 **Advanced Instance Management**
  - Priority-based sorting (alerts first)
  - One-click access to AWS Console
  - Instance type and region display
  - Comprehensive tag management

- ⚡ **Efficient Filtering**
  - Filter by environment tags
  - Multi-account view
  - Service-based filtering
  - Team and project filtering

- ⚠️ **Alert System**
  - Critical, warning, and info alerts
  - Visual alert indicators
  - Alert prioritization
  - Instance status highlighting

- 💰 **Cost Management**
  - Real-time cost tracking
  - Per-account cost summaries
  - Instance-level cost details
  - Total infrastructure cost overview

- 🎨 **Beautiful UI/UX**
  - Space-themed dark mode design
  - Responsive layout
  - Interactive instance cards
  - Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- AWS account(s) with EC2 access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cosmic-aws-monitor.git
   cd cosmic-aws-monitor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the provided URL (usually http://localhost:5173)

## Development

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── data/              # Mock data and constants
└── __tests__/         # Test files
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run coverage` - Generate test coverage report
- `npm run lint` - Run ESLint

### Testing

The project uses Vitest and Testing Library for testing. Run tests with:

```bash
npm run test
```

## AWS Configuration

### Required Permissions

Your AWS IAM user needs the following permissions:
- `ec2:DescribeInstances`
- `ec2:DescribeInstanceStatus`
- `cloudwatch:GetMetricData`

### Adding AWS Accounts

1. Create an IAM user with the required permissions
2. Generate Access Key ID and Secret Access Key
3. Use the "Add AWS Account" button in the dashboard
4. Enter account details and credentials
5. The dashboard will automatically start monitoring the new account

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Keep components small and focused
- Use TypeScript for all new code

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React, TypeScript, and Tailwind CSS
- Icons provided by Lucide React
- Space theme inspired by NASA imagery