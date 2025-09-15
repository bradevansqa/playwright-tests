pipeline {
    agent any  // run on the Jenkins container itself

    environment {
        NODE_VERSION = '18.20.0'
    }

    stages {
        stage('Setup Node.js') {
            steps {
                echo "Installing Node.js..."
                sh '''
                curl -fsSL https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz -o node.tar.xz
                tar -xf node.tar.xz
                export PATH=$PWD/node-v$NODE_VERSION-linux-x64/bin:$PATH
                node -v
                npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers..."
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                sh 'npx playwright test --reporter=line,junit'
            }
        }

        stage('Publish Test Results') {
            steps {
                echo "Publishing JUnit test results..."
                junit 'playwright-report/results.xml'
            }
        }
    }
}
