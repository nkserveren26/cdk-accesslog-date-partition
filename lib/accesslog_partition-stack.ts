import * as cdk from 'aws-cdk-lib';
import { Bucket, PartitionDateSource, TargetObjectKeyFormat } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class AccesslogPartitionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // アクセスログバケット名
    const accessLogBucketName: string = "bucket-for-accesslog-test";

    // アクセスログを有効化するバケット
    const bucketName: string = "bucket-for-partition-test";

    // アクセスログを保存するバケット
    const accessLogBucket: Bucket = new Bucket(this, accessLogBucketName, {
      bucketName: accessLogBucketName,
    });

    // アクセスログを有効化するバケット
    const bucket: Bucket = new Bucket(this, bucketName, {
      bucketName: bucketName,
      serverAccessLogsBucket: accessLogBucket,
      // 日付ベースのパーティションを有効化する際は、partitionedPrefixにPartitionDateSource.EVENT_TIMEを指定
      targetObjectKeyFormat: TargetObjectKeyFormat.partitionedPrefix(PartitionDateSource.EVENT_TIME),
    });
  }
}
