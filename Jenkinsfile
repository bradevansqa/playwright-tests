pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    triggers {
        cron('H 1 * * *') // nightly at 1 AM
    }

    stages {
        stage('Setup Node.js') {
            steps {
                echo "Verifying Node.js and npm..."
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers..."
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                sh 'npx playwright test --reporter=line,junit'
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
