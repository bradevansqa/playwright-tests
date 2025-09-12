pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git(
                    url: 'https://github.com/bradevansqa/playwright-tests',
                    branch: 'master',
                    credentialsId: 'github-jenkins-ci-token'
                )
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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
}