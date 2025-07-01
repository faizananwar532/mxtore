# MXTORE E-commerce Website

MXTORE is a modern e-commerce website template with responsive design and comprehensive features including product listings, about us, contact us, and error pages.

## Deployment to AWS S3

This project includes a GitHub Actions workflow to automatically deploy the website to an AWS S3 bucket when changes are pushed to the main branch.

### Prerequisites

1. An AWS account
2. An S3 bucket configured for static website hosting
3. (Optional) A CloudFront distribution pointing to your S3 bucket

### Setting up GitHub Secrets

To deploy to S3, you need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:

| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key ID |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret access key |
| `AWS_REGION` | The AWS region where your S3 bucket is located (e.g., `us-east-1`) |
| `AWS_S3_BUCKET` | The name of your S3 bucket (e.g., `my-mxtore-website`) |
| `CLOUDFRONT_DISTRIBUTION_ID` | (Optional) Your CloudFront distribution ID if you're using CloudFront |

### Creating an IAM User for Deployment

For security best practices, create a dedicated IAM user with limited permissions for the deployment:

1. Go to the AWS IAM console
2. Create a new user with programmatic access
3. Attach the following inline policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::YOUR-BUCKET-NAME",
                "arn:aws:s3:::YOUR-BUCKET-NAME/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
```

Replace `YOUR-BUCKET-NAME` with your actual S3 bucket name.

### How the Deployment Works

The GitHub Actions workflow:

1. Runs when you push to the main branch or manually trigger the workflow
2. Configures AWS credentials
3. Copies website files to a temporary directory, excluding Git and configuration files
4. Uploads non-HTML files to S3 with a 24-hour cache
5. Uploads HTML files with no-cache directives for immediate updates
6. Invalidates the CloudFront distribution (if configured)

### Manual Deployment

You can also manually trigger the deployment by:

1. Going to the "Actions" tab in your GitHub repository
2. Selecting the "Deploy to S3" workflow
3. Clicking "Run workflow"

## Local Development

To work on this project locally:

1. Clone the repository
2. Open the project in your preferred code editor
3. Use a local server to preview changes (e.g., `python -m http.server` or Live Server extension in VS Code)

## Project Structure

- `index.html` - Homepage
- `about.html` - About Us page
- `contact.html` - Contact Us page
- `products.html` - Products listing page
- `error.html` - 404 error page
- `error-generic.html` - Generic error page for different error types
- `styles.css` - Main stylesheet
- `products.css` - Products page specific styles
- `about-contact.css` - About and Contact pages specific styles
- `script.js` - Main JavaScript file
- `products.js` - Products page specific JavaScript
- `images/` - Image assets

## Features

- Modern, responsive design that works across desktop, tablet, and mobile devices
- Clean, user-friendly interface showcasing product categories
- Newsletter signup with special offer
- Highlighting of key features like free shipping, secure payment, etc.
- Smooth animations and hover effects

## Customization

You can customize this template by:

- Changing the color scheme in the `:root` section of `