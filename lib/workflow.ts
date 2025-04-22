import { Client as WorkflowClient } from "@upstash/workflow";
import axios from "axios";
import config from "./config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  const templateParams = {
    to_email: email,
    subject,
    message,
  };

  await axios.post(config.env.emailJS.apiEndpoint, {
    service_id: config.env.emailJS.serviceId,
    template_id: config.env.emailJS.templateId,
    user_id: config.env.emailJS.publicKey,
    template_params: templateParams,
  });
};
