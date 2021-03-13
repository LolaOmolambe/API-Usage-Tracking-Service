class QueryHelper {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      console.log(queryObj);
      const excludedFields = ['currentPage','perPage'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      this.query = this.query.find(queryObj);
  
      return this;
    }
  
    paginate() {
      const currentPage = this.queryString.currentPage * 1 || 1;
      const perPage = this.queryString.perPage * 1 || 15;
      const skip = (currentPage - 1) * perPage;
  
      this.query = this.query.skip(skip).limit(perPage);
  
      return this;
    }
  }
  module.exports = QueryHelper;