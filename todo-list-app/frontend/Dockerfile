FROM nginx:1.27.0

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the built files from the build context to the Nginx HTML directory
COPY dist/ .

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
