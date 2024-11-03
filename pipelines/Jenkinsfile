pipeline {
    agent any

    stages {
        stage('Build image') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'docker build -t cypress_test .'
            }
        }
        stage('Run Test in container') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'docker run --name cypress_test -v "%cd%":/e2e -w /e2e --entrypoint=cypress cypress/included:12.8.1 run'
            }
        }
        stage('Copy report') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'docker cp cypress_test:/app/allure-report ./allure-report'
            }
        }
        stage('Publish HTML report') {
            steps {
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'allure-report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
            }
        }
        stage('Clean docker container') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'docker container rm cypress_test'
            }
        }
        stage('Clean docker image') {
            steps {
                bat encoding: 'ASCII', returnStatus: true, script: 'docker image rm cypress_test'
            }
        }
    }
}
