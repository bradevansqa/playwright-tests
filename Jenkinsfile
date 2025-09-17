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

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive Playwright HTML report folder
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            // Optional: keep console log for reference
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
        }
    }
}
