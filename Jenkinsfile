pipeline {
  agent {
    docker { image 'mcr.microsoft.com/playwright:focal' }
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Run Tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }
}
