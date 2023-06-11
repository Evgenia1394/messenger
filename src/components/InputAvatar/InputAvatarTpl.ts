import "../../styles/commonStyles.scss";

export const inputAvatarTpl = `
        <form id="uploadForm">
        <div class="upload-container">
          <input type="file" id="file-input" accept=".png, .jpg, .jpeg" name="myFile">
          <label for="file-input" id="file-label">
            <img class="photo" src={{{url}}}>
          </label>
        </div>
        </form>
    `
