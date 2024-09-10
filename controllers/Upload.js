exports.imageUpload = async (req, res) => {
    try{
    //data fetch
    const { name, tags, email} = req.body;
    console.log(name,tags,email);
    const file = req.files.imageFile;
    console.log(file);
    //Validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type:", fileType);
    if(!isFileTypeSupported(fileType, supportedTypes)) {
    return res.status(400).json({
    success:false,
    message:'File format not supported',
    })
    }
    //file format supported hai
    console.log("Uploading to Codehelp");
    const response = await uploadFileToCloudinary(file, "Codehelp");
    console.log(response);
    //db me entry save krni h
    const fileData = await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
    });
    res.json({
    success:true,
    imageUrl:response.secure_url,
    message:'Image Successfully Uploaded',
    })
    }
    catch(error) {
    console.error(error);
    res.status(400).json({
        success:false,
    message:'Something went wrong',
});
}
}
