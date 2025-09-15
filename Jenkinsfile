pipeline {
    agent any

    environment {
        // Make sure Node.js is installed and on the PATH
        NODE_ENV = 'test'
    }

    triggers {
        // Run nightly at 1:00 AM
        cron('H 1 * * *')
    }

    stages {
        stage('Setup Node.js') {
            steps {
                echo "Verifying Node.js and npm..."
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers..."
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                bat 'npx playwright test --reporter=line,junit'
            }
        }

        stage('Publish Test Results') {
            steps {
                echo "Publishing JUnit test results..."
                junit 'playwright-report/results.xml'
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }

        success {
            echo "Pipeline succeeded!"
        }

        failure {
            echo "Pipeline failed!"
        }
    }
}
