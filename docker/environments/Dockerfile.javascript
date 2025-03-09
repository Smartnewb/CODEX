FROM node:18-alpine

WORKDIR /app

# Install global dependencies
RUN npm install -g jest

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Set environment variables
ENV NODE_ENV=development

# Expose port for development server
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"] 