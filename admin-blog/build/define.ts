import moment from 'moment'

/** 项目构建时间 */
const PROJECT_BUILD_TIME = JSON.stringify(moment().format('YYYY-MM-DD HH:mm:ss'));

export const define = {
  PROJECT_BUILD_TIME
};
