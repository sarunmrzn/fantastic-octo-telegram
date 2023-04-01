import AWS from 'aws-sdk';
const lambda = new AWS.Lambda();

exports.handler = async () => {
  const params = {
    FunctionName: 'lambda-test',
    Environment: {
      Variables: {
        CRON_SCHEDULE: '0 0 * * 0',
      },
    },
  };
  await lambda.updateFunctionConfiguration(params).promise();

  return {
    status: 200,
    body: 'Cron schedule updated successfully!',
  };
};
