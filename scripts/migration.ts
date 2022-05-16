import { exec } from 'child_process';

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd): Promise<any> {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      resolve({ stdout, stderr });
      return;
      if (err) {
        console.log("error", err)
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  const args = process.argv.slice(2, 3);
  const { stdout } = await sh('npm run typeorm migration:generate ./src/db/migrations/' + args[0]);
  console.log(stdout)
}

main();