// Nomenclatura de variáveis

const listUserCategoryByFollowers = [
  {
    title: "User",
    followers: 5,
  },
  {
    title: "Friendly",
    followers: 50,
  },
  {
    title: "Famous",
    followers: 500,
  },
  {
    title: "Super Star",
    followers: 1000,
  },
];

export default async function getUserGithubAccount(req, res) {
  const githubUsername = String(req.query.username);

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`,
    });
  }

  const searchUser = await fetch(
    `https://api.github.com/users/${githubUsername}`
  );

  if (searchUser.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`,
    });
  }

  const user = await searchUser.json();

  const orderListByFollowers = listUserCategoryByFollowers.sort(
    (a, b) => b.followers - a.followers
  );

  const userCategory = orderListByFollowers.find(
    (category) => user.followers > category.followers
  );

  const resultList = {
    githubUsername,
    category: userCategory.title,
  };

  return resultList;
}

getUserGithubAccount(
  {
    query: {
      username: "josepholiveira",
    },
  },
  {}
);
