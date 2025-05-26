# Base image
FROM python:alphine3.12

WORKDIR /app/

# Set environment variables to prevent unwanted behaviors
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
RUN pip install --upgrade pip

# Copy project files to the container
COPY . /app/

# Install Python dependencies
RUN pip install -r requirements.txt

# Create non-root user
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser
