pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
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

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive Playwright HTML reports
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // Optional: mark build result
            junit 'playwright-report/**/*.xml'
        }
    }
}
