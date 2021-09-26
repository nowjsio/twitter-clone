export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      //NOTE: {...options, header: {test: 123}} options 에 header 가 있으면, {test:123} 으로 덮어씌워진다. 따라서, header 안에 따로 ...options.header 넣어줘야한다.
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.header,
      },
    });

    // const data = await res.json();
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : "Something went wrong!";
      throw new Error(message);
    }
    return data;
  }
}
