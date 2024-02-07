import Auth from './auth';
import { RequestError } from './request-error';

export default class Client {
  /**
   * Constructor
   */
  constructor() {
    this.auth = new Auth();
  }

  /**
   * Create an API request
   *
   * @param {string} endpoint
   * @param {string} method
   * @param {object|null} body
   * @param {object|null} params
   * @returns {Promise<any>}
   */
  async request(endpoint, method = 'GET', body = null, params = null) {
    const perscomId = await this.auth.getPerscomId();
    const apiKey = await this.auth.getApiKey();

    let init = {
      cache: 'no-store',
      method: method,
      headers: {
        'X-Perscom-Id': perscomId,
        'X-Perscom-Widget': true,
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (body) {
      init.body = JSON.stringify(body);
    }

    const url = new URL(process.env.API_URL + endpoint);

    if (params) {
      const additionalParams = new URLSearchParams(params);
      additionalParams.forEach((value, key) => url.searchParams.set(key, value));
    }

    const response = await fetch(url.href, init);
    const json = await response.json();

    if (response.status < 200 || response.status >= 300) {
      throw new RequestError({
        status: response.status,
        response: json,
        message:
          json.error?.message ?? 'There was an error with the last request. Please try again.'
      });
    }

    return json;
  }

  /**
   * Get a list of awards
   *
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getAwards(params = {}) {
    return await this.request('awards', 'GET', null, { ...params, ...{ include: 'image' } });
  }

  /**
   * Get a list of events
   *
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getEvents(params = {}) {
    return await this.request('events', 'GET', null, {
      ...params,
      ...{ include: 'calendar', limit: '100' }
    });
  }

  /**
   * Get a list of forms
   *
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getForms(params = {}) {
    return await this.request('forms', 'GET', null, params);
  }

  /**
   * Get a form
   *
   * @param id
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getForm(id, params = {}) {
    return await this.request(`forms/${id}`, 'GET', null, {
      ...params,
      ...{ include: 'fields', limit: 100 }
    });
  }

  /**
   * Get a list of groups
   *
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getGroups(params = {}) {
    return await this.request('groups', 'GET', null, {
      ...params,
      ...{
        include:
          'units,units.users,units.users.position,units.users.rank,units.users.rank.image,units.users.specialty,units.users.status,units.subunits,units.subunits.users,units.subunits.users.position,units.subunits.users.rank,units.subunits.users.rank.image,units.subunits.users.specialty,units.subunits.users.status',
        limit: 100
      }
    });
  }

  /**
   * Get the newsfeed
   *
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getNewsfeed(params = {}) {
    return await this.request('newsfeed', 'GET', null, params);
  }

  /**
   * Get a list of qualifications
   *
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getQualifications(params = {}) {
    return await this.request('qualifications', 'GET', null, {
      ...params,
      ...{ include: 'image' }
    });
  }

  /**
   * Get a list of ranks
   *
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getRanks(params = {}) {
    return await this.request('ranks', 'GET', null, {
      ...params,
      ...{ include: 'image' }
    });
  }

  /**
   * Get a user
   *
   * @param id
   * @param {object} params
   * @returns {Promise<*>}
   */
  async getUser(id, params = {}) {
    return await this.request(`users/${id}`, 'GET', null, params);
  }

  /**
   * Create a like
   *
   * @param id
   * @param {object|null} body
   * @param {object} params
   * @returns {Promise<*>}
   */
  async postLike(id, body = null, params = {}) {
    return await this.request(`newsfeed/${id}/likes/attach`, 'POST', body, params);
  }

  /**
   * Remove a like
   *
   * @param id
   * @param {object|null} body
   * @param {object} params
   * @returns {Promise<*>}
   */
  async postUnlike(id, body = null, params = {}) {
    return await this.request(`newsfeed/${id}/likes/detach`, 'DELETE', body, params);
  }

  /**
   * Create a submission
   *
   * @param id
   * @param {object|null} body
   * @param {object} params
   * @returns {Promise<*>}
   */
  async postSubmission(id, body = null, params = {}) {
    return await this.request(`forms/${id}/submissions`, 'POST', body, params);
  }
}
