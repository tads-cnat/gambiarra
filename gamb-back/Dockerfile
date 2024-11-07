# Base image
FROM python:3.11-slim

# Setup environment variables
ENV DockerHOME=/home/app/webapp

# Set work directory
RUN mkdir -p $DockerHOME
WORKDIR $DockerHOME

# Set environment variables to prevent unwanted behaviors
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN pip install --upgrade pip

# Copy project to Docker home directory
COPY . $DockerHOME

# Install Python dependencies from requirements.txt
RUN pip install -r requirements.txt

# Expose port for Django app
EXPOSE 8000

# Start Django server, bind to all interfaces
CMD python manage.py runserver 0.0.0.0:8000