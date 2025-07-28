# Use Python base image
FROM python:3.9

# Set working directory
WORKDIR /web

# Copy app files
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Run the app
CMD ["python", "app.py"]
