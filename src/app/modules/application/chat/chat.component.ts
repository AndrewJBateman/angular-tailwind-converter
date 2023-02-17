import { Component, OnInit } from '@angular/core';
import { Configuration, OpenAIApi} from 'openai';
import { env } from './process';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  DEFAULT_PARAMS = {
    "model": "text-davinci-002",
    "temperature": 0,
    "max_tokens": 300,
    "top_p": 1,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.0
  }
  messages: any = []; currentMessage = '';

  configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY
  });

  openai = new OpenAIApi(this.configuration);

  constructor() {
    this.messages.push({
      content: 'Ask me a question',
      sentBy: 'bot'
    });
  }

  ngOnInit(): void {
    console.log(this.configuration);
  }

  async sendMessage() {
    const queryParams = {
      "prompt": this.currentMessage,
      // "prompt": this.messages.map((m: any) => `${m.sentBy}: ${m.content}`).join('\n') + `\nuser: ${this.currentMessage}\nbot:`,
    }
    const params_ = { ...this.DEFAULT_PARAMS, ...queryParams };
    console.log("params: ", params_)
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String("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")
      },
      body: JSON.stringify(params_)
    };
    try {
      const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
      const data = await response.json();
      // const data = requestOptions;
      console.log("data:", data.body);
      this.messages.push({
        content: data.choices[0].text,
        sentBy: 'bot'
      });
      console.log("messages: ", this.messages);
      return data.choices[0].text;
    } catch (error: any) {
      return error.message;
    }
  }

}