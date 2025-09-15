pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:focal'
            args '--shm-size=1gb'
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=line,junit'
            }
        }

        stage('Publish Test Results') {
            steps {
                junit 'playwright-report/results.xml'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
