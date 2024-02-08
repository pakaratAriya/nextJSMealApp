import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");
export const getMeals = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  // throw new Error("failed to fetch");
  return db.prepare("SELECT * FROM meals").all();
};

export const getMealDetail = async (mealSlug) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealSlug);
};

export const saveMeal = async (meal) => {
  meal.slug =
    slugify(meal.title, { lower: true }) + Math.floor(Math.random() * 1000);
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();

  const filename = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });
  meal.image = `/images/${filename}`;
  db.prepare(
    `INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES 
    (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)`
  ).run(meal);
};
