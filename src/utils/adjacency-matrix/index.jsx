// 搜寻链路
const lookupLink = (params) => {
  return params
    .reduceRight((total, current) => {
      if (total[total.length - 1] === current[0] && current[1]) {
        total.push(current[1]);
      }
      return total;
    }, params[params.length - 1])
    .reverse();
};

export default lookupLink;
