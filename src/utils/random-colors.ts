import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";

// generate random gradient colors
export const randomColors = async (
  c: Context<BlankEnv, "/api/random/:count?", BlankInput>
) => {
  const count = c.req.param("count");
  // convert count to integer
  const countInt = parseInt(count || "10") || 10;
  // check if count is greater than 100
  if (countInt > 100) {
    return c.json(
      {
        error: "Count should be less than or equal to 100",
      },
      400
    );

    // check if count is less than 1
  } else if (countInt < 1) {
    return c.json(
      {
        error: "Count should be greater than or equal to 1",
      },
      400
    );
  } else {
    // generate random gradient colors
    const colors: colorGradientType[] = [];
    for (let i = 0; i < countInt; i++) {
      const colorStart = Math.floor(Math.random() * 16777215);
      const colorEnd = Math.floor(Math.random() * 16777215);

      // check if colorStart and colorEnd are have over 20 difference
      if (Math.abs(colorStart - colorEnd) < 20) {
        i--;
        continue;
      } else {
        // convert to hex
        const hexStart = "#" + colorStart.toString(16);
        const hexEnd = "#" + colorEnd.toString(16);
        // check if any color length is less than 7
        if (hexStart.length < 7 || hexEnd.length < 7) {
          i--;
          continue;
        }
        colors.push({
          start: hexStart,
          end: hexEnd,
        });
      }
    }
    // return colors
    return c.json({
      colors,
    });
  }
};
