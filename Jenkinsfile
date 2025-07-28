pipeline {
  agent any

  parameters {
    choice(name: 'APP_NAME', choices: ['web1', 'web2', 'web3'], description: 'Select the application to deploy')
  }

  environment {
    DOCKER_IMAGE = "zorothehunter/${params.APP_NAME}"
    K8S_NAMESPACE = "default"
    AWS_REGION = "us-east-1"
    EKS_CLUSTER = "eks-cluster"
  }

  stages {

    stage('Clone Repository') {
      steps {
        git branch: 'main', url: 'https://github.com/Shravani1603/EKS-MultiApp-Project.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        dir("${params.APP_NAME}") {
          sh "docker build -t ${DOCKER_IMAGE} ."
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withEnv(["AWS_DEFAULT_REGION=${env.AWS_REGION}"]) {
          withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
            sh '''
              aws eks update-kubeconfig --name $EKS_CLUSTER
              kubectl apply -f ${APP_NAME}/${APP_NAME}-deployment.yaml -n $K8S_NAMESPACE
              kubectl apply -f apps-ingress.yaml
              kubectl rollout restart deployment $APP_NAME
            '''
          }
        }
      }
    }
  }

  post {
    success {
      echo "✅ Deployment of ${params.APP_NAME} was successful!"
    }
    failure {
      echo "❌ Deployment failed. Check logs for ${params.APP_NAME}."
    }
  }
}
