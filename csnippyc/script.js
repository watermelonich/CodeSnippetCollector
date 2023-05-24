document.addEventListener('DOMContentLoaded', function () {
    var currentFile = null;
    var lazyLoadFiles = true;
  
    function lazyLoadFileList() {
        if (lazyLoadFiles) {
            lazyLoadFiles = false;
            displayFiles();
        }
    }
  
    function saveFile() {
        var text = document.querySelector('.codesnippetcont').innerHTML;
  
        if (currentFile) {
            localStorage.setItem(currentFile, text);
            displayFiles();
        }
    }
  
    function openCreateFileModal() {
        var createFileModal = document.getElementById('createFileModal');
        createFileModal.style.display = 'block';
    }
  
    function closeCreateFileModal() {
        var createFileModal = document.getElementById('createFileModal');
        createFileModal.style.display = 'none';
    }
  
    function createFile() {
        var fileNameInput = document.getElementById('fileNameInput');
        var fileName = fileNameInput.value;
  
        if (fileName) {
            localStorage.setItem(fileName, document.querySelector('.codesnippetcont').innerHTML);
            currentFile = fileName;
            displayFiles();
            closeCreateFileModal();
            fileNameInput.value = '';
        }
    }
  
    function deleteFile(fileName) {
        localStorage.removeItem(fileName);
        if (currentFile === fileName) {
            currentFile = null;
            document.querySelector('.codesnippetcont').innerHTML = '';
        }
        displayFiles();
    }
  
    function displayFiles() {
        var fileList = document.getElementById('filelist');
        fileList.innerHTML = '';
  
        for (var i = 0; i < localStorage.length; i++) {
            var fileName = localStorage.key(i);
            var link = document.createElement('div');
            link.classList.add('tooltip');
            var fileNameLink = document.createElement('a');
            fileNameLink.href = '#';
            fileNameLink.textContent = fileName;
            fileNameLink.addEventListener('click', loadFile.bind(null, fileName));
            var tooltip = document.createElement('span');
            tooltip.classList.add('tooltiptext');
            tooltip.textContent = 'Delete';
            tooltip.addEventListener('click', deleteFile.bind(null, fileName));
            link.appendChild(fileNameLink);
            link.appendChild(tooltip);
            fileList.appendChild(link);
        }
    }
  
    function loadFile(fileName) {
        var text = localStorage.getItem(fileName);
        document.querySelector('.codesnippetcont').innerHTML = text;
        currentFile = fileName;
    }
  
    // Attach event listeners
    document.getElementById('savefile').addEventListener('click', saveFile);
    document.getElementById('createfile').addEventListener('click', openCreateFileModal);
    document.getElementById('createButton').addEventListener('click', createFile);
    document.getElementById('cancelButton').addEventListener('click', closeCreateFileModal);
  
    // Attach event listener for lazy loading
    window.addEventListener('scroll', lazyLoadFileList);
    window.addEventListener('load', lazyLoadFileList);
  
    // Display initial files
    displayFiles();
  });
  