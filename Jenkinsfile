pipeline {
    agent any
    stages {
        stage('Setup Node.js') {
            steps {
                sh '''
                    # Check if Node.js is already installed
                    if ! command -v node &> /dev/null; then
                        echo "Installing Node.js using package manager..."
                        apt-get update && apt-get install -y nodejs npm
                    else
                        echo "Node.js is already installed: $(node --version)"
                    fi
                    
                    # Verify installation
                    node --version
                    npm --version
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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
}