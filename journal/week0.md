# Week 0 — Billing and Architecture

I was able to install AWS CLI directly on Gitpod by following instructions on the [AWS CLI Install Documentation page](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### Create a budget 
I created a budget alarm for $1 to keep cost down as I was learning how to do stuff. 
I do have a second budget setup but will be deleted soon for concerns of two budget limit on the free tier 

![Budget alarm I created](assets/budget%20alarm.png)

### Create an alarm 

I created an alarm using CloudWatch for activity and to keep in the free tier as much as possible 

![CloudWatch alarm I created](assets/Alarm.png)

### Logical Architecture diagram

I recreated this Architechture design using Lucid Charts to practice and understand a basic design 

![Lucid Chart Diagram](assets/Logical%20chart.png)

### Logical Architecture Diagram link
[Lucid Charts Share link](https://lucid.app/lucidchart/1ff8b924-543c-4931-a644-7305f1505c20/edit?viewport_loc=-67%2C352%2C3463%2C1698%2C0_0&invitationId=inv_b1143cf9-8003-444c-9465-f89da53df050)

## Code Example 

```json
{
    "AlarmName": "DailyEstimatedCharges",
    "AlarmDescription": "This alarm would be triggered if the daily estimated charges exceeds 50$",
    "ActionsEnabled": true,
    "AlarmActions": [
        "arn:aws:sns:us-east-1:911167897863:billing-alarm"
    ],
    "EvaluationPeriods": 1,
    "DatapointsToAlarm": 1,
    "Threshold": 50,
    "ComparisonOperator": "GreaterThanOrEqualToThreshold",
    "TreatMissingData": "breaching",
    "Metrics": [{
        "Id": "m1",
        "MetricStat": {
            "Metric": {
                "Namespace": "AWS/Billing",
                "MetricName": "EstimatedCharges",
                "Dimensions": [{
                    "Name": "Currency",
                    "Value": "USD"
                }]
            },
            "Period": 86400,
            "Stat": "Maximum"
        },
        "ReturnData": false
    },
    {
        "Id": "e1",
        "Expression": "IF(RATE(m1)>0,RATE(m1)*86400,0)",
        "Label": "DailyEstimatedCharges",
        "ReturnData": true
    }]
}

```

## List Example 

- This 
- Is
- A
- List

  ## Table Example
  | My | Cool | Table |
  | ---| -----|-------|
  | HI | Example| ! |
  
