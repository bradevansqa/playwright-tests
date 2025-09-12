pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:focal'
            args '--shm-size=1gb'
        }
    }

    environment {
        NODE_ENV = 'test'
    }

    triggers {
        // Run nightly at 1:00 AM
        cron('H 1 * * *')
    }

    stages {
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
