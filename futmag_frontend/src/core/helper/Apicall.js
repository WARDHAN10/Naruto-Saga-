const { API } = require("../../backend");

exports.all = () => {
  return fetch(`${API}/a/all`, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOne = () => {
  const param = new URLSearchParams(window.location.pathname);
  console.log(param);
  const id = param.get();
  return fetch(`${API}/${id}`, { method: "GET" })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.createBlog = (userId, token, blog) => {
  return fetch(`${API}/create/${userId}`, {
    // mode: "no-cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

exports.geMyArt = (userId, token) => {
  return fetch(`${API}/user/${userId}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getOne = (articleId) => {
  console.log(articleId);
  return fetch(`${API}/${articleId}`, { method: "GET" })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.UpdateOne = (userId, token, articleId, blog) => {
  return fetch(`${API}/${articleId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

exports.removeOne = (userId, token, articleId) => {
  return fetch(`${API}/${articleId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

exports.like = (userId, token, articleId) => {
  return fetch(`${API}/like/${articleId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

exports.unlike = (userId, token, articleId) => {
  return fetch(`${API}/unlike/${articleId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

exports.AllTop = () => {
  return fetch(`${API}/b/topArticles`, { method: "GET" })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
};
