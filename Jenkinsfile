pipeline {
    agent any

    environment {
        // Ensure NODE_ENV is set if needed
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/bradevansqa/playwright-tests.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Generate HTML report in fixed folder
                sh 'npx playwright test --reporter=html --output=playwright-report'
            }
        }

        stage('Archive Test Reports') {
            steps {
                // Archive the entire HTML report folder
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: false
            }
        }

        stage('Optional Debug') {
            steps {
                // Only needed if you want to debug what Jenkins sees
                sh 'ls -alh'
                sh 'ls -alh playwright-report'
            }
        }
    }

    post {
        always {
            // Optional: keep logs even if build fails
            junit 'playwright-report/**/*.xml' // only if you output junit files
        }
    }
}
