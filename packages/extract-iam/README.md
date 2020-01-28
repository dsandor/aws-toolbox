# awsextract-iam

Extracts the IAM role configuration information from an existing AWS account and formats for use in a CloudFormation template. 

**usage**

```
npx awsextract-iam -r your-role-name
```

This command will locate the IAM role of the name `your-role-name` and dump out a CloudFormation template compatible resource segemnt.

**options**

|option|description|
|---|---|
|`-r` or `--role-name`|[required] The name (nor arn) of the role to extract.|
|`-j`|Outputs a JSON segment.|
|`-y`|[default] Outputs a YAML segment.|

*Note that you may specify `j` and `y` to output both formats if you wish.

