pipeline {
    agent any  // Use the built-in node

    environment {
        NODE_ENV = 'test'
        NODE_VERSION = '18.20.4'
        PATH = "${WORKSPACE}/node-v${NODE_VERSION}-linux-x64/bin:${PATH}"
    }

    triggers {
        // Run nightly at 1:00 AM
        cron('H 1 * * *')
    }

    stages {
        stage('Setup Node.js') {
            steps {
                sh '''
                    # Install Node.js if not already in workspace
                    if [ ! -d "node-v${NODE_VERSION}-linux-x64" ]; then
                        echo "Downloading Node.js ${NODE_VERSION}..."
                        curl -sL https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz | tar -xJ
                    fi
                    node --version
                    npm --version
                '''
            }
        }

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

        success {
            echo "Pipeline succeeded!"
        }

        failure {
            echo "Pipeline failed!"
        }
    }
}
