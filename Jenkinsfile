pipeline {
    agent any
    environment {
        NODE_VERSION = '18.20.4'
        PATH = "${WORKSPACE}/node-v${NODE_VERSION}-linux-x64/bin:${PATH}"
    }
    stages {
        stage('Setup Node.js') {
            steps {
                sh '''
                    # Check if Node.js is already installed in workspace
                    if [ ! -d "node-v${NODE_VERSION}-linux-x64" ]; then
                        echo "Downloading Node.js ${NODE_VERSION}..."
                        wget -q https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz
                        tar -xf node-v${NODE_VERSION}-linux-x64.tar.xz
                        rm node-v${NODE_VERSION}-linux-x64.tar.xz
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