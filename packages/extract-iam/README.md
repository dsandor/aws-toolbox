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
|`-n`|[default false] Name the resource. If specified, the RoleName property is included in the output.)|

*Note that you may specify `j` and `y` to output both formats if you wish.

* **Auto Name** - If you specify the `-n` flag the RoleName will be included in the resource output. By default we allow CloudFormation to name the role for you. If you are deploying a CloudFormation template to AWS and you specify a named 
role you will have to use the CAPABILITY_NAMED_IAM in order to create the stack. Otherwise you will just need the CAPABILITY_IAM.


