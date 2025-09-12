pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git(
                    url: 'git@github.com:yourusername/playwright-tests.git',
                    branch: 'main',
                    credentialsId: 'jenkins-ssh-key'
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
