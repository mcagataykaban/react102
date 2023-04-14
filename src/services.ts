import { SES } from "aws-sdk";

const ses = new SES({
    accessKeyId: '',
    region: '',
    secretAccessKey: '',
});

export type Template = {
    TemplateName: string;
    SubjectPart: string;
    HtmlPart: string;
}

export async function listTemplates(): Promise<SES.ListTemplatesResponse> {
    try {
        const data = await ses.listTemplates({}).promise();
        return data;
    } catch (error) {
        console.error("Error listing templates:", error);
        throw error;
    }
}

export async function createTemplate(template: Template): Promise<void> {
    const params: SES.CreateTemplateRequest = {
        Template: {
            TemplateName: template.TemplateName,
            SubjectPart: template.SubjectPart,
            HtmlPart: template.HtmlPart,
        },
    };
    await ses.createTemplate(params).promise();
}

export async function deleteTemplate(TemplateName: string): Promise<void> {
    const params: SES.DeleteTemplateRequest = { TemplateName };
    await ses.deleteTemplate(params).promise();
}

export const sendEmail = async (params: SES.Types.SendTemplatedEmailRequest): Promise<void> => {
    await ses.sendTemplatedEmail(params).promise();
};


//example 'GET' request
export async function fetchCharacters(): Promise<Array<{name: string}>> {
    try {
      const response = await fetch('https://last-airbender-api.fly.dev/api/v1/characters', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }