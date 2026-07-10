# GitHub Mystery React

A React application that fetches random GitHub users and their public repositories.

## Features

- Random GitHub user search with filters (language, min repos, min followers)
- Token input for authenticated requests (optional)
- Skeleton loading state
- Error state with retry
- User card with avatar, name, bio, stats, repos list
- Dark theme (GitHub Dark style)
- Responsive design
- Keyboard shortcut (R to refresh)

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18 + TypeScript
- **State Management**: Zustand
- **Styling**: CSS Modules
- **Icons**: SVG Icons (no external dependencies)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd github-mystery-react

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
github-mystery-react/
├── public/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── TokenInput/
│   │   ├── FilterSection/
│   │   ├── Skeleton/
│   │   ├── ErrorState/
│   │   ├── UserCard/
│   │   ├── RepoList/
│   │   ├── Footer/
│   │   └── Icon/
│   ├── store/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── App.tsx
│   ├── App.module.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Usage

1. **Random User**: Click the "Random User" button or press R to fetch a random GitHub user
2. **Filter by Language**: Select a programming language from the dropdown
3. **Filter by Repos**: Set minimum number of public repositories
4. **Filter by Followers**: Set minimum number of followers
5. **Token (Optional)**: Enter a GitHub Personal Access Token to increase rate limits

## API Rate Limits

- **Anonymous**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

## License

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
