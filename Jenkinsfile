pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

        stage('Run Playwright Tests') {
            steps {
                // Run tests and output HTML report into playwright-report/
                sh 'npx playwright test --reporter=html --output=playwright-report'
                // Optional: check files exist
                sh 'ls -alh playwright-report'
            }
        }

        stage('Archive Test Reports') {
            steps {
                // Archive the report folder so Artifacts tab appears
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: false
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
