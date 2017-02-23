<%@ WebHandler Language="C#" Class="AdminHandler" %>

using System;
using System.Web;
using System.Reflection;
using System.Collections.Generic;
using CSFirstScheme.Entity.Admin;
using CSFirstScheme.CClassLibrary.Repository;
using Newtonsoft.Json;


public class AdminHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
  

        string action = context.Request["action"];
        if (!string.IsNullOrEmpty(action))
        {
           MethodInfo method = this.GetType().GetMethod(action);
           method.Invoke(this, new object[] { context });
        }
    }

    public void InformationResult(HttpContext context)
    {
        string result = string.Empty;
        string Method = context.Request["Method"];
        InformationRepository repository = new InformationRepository();

        switch (Method)
        {
            case "Add":
                Information item = new Information();
                item.CreateTime = DateTime.Now;
                item.InformationId = Guid.NewGuid();
                item.CreateBy = "Admin";
                int rows = repository.Add(item);
                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = rows > 0 ? "添加成功" : "添加失败"
                });
                break;
            case "Select":
                List<Information> list = repository.Select();

                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = string.Format("共{0}条数据", list.Count),
                    date = list
                });
                
                break;

        }
        context.Response.Write(result);
        context.Response.End();
    }



    public void NewsResult(HttpContext context)
    {
        string result = string.Empty;
        string Method = context.Request["Method"];
        NewsRepository repository = new NewsRepository();

        switch (Method)
        {
            case "Add":
                News item = new News();
                item.CreateTime = DateTime.Now;
                item.NewsId = Guid.NewGuid();
                item.CreateBy = "Admin";
                int rows = repository.Add(item);
                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = rows > 0 ? "添加成功" : "添加失败"
                });
                break;
            case "Select":
                List<News> list = repository.Select();

                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = string.Format("共{0}条数据", list.Count),
                    date = list
                });

                break;

        }
        context.Response.Write(result);
        context.Response.End();
    }

    public void NoticeResult(HttpContext context)
    {
        string result = string.Empty;
        string Method = context.Request["Method"];
        NoticeRepository repository = new  NoticeRepository();

        switch (Method)
        {
            case "Add":
                Notice item = new Notice();
                item.CreateTime = DateTime.Now;
                item.NoticeId = Guid.NewGuid();
                item.CreateBy = "Admin";
                int rows = repository.Add(item);
                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = rows > 0 ? "添加成功" : "添加失败"
                });
                break;
            case "Select":
                List<Notice> list = repository.Select();

                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = string.Format("共{0}条数据", list.Count),
                    date = list
                });

                break;

        }
        context.Response.Write(result);
        context.Response.End();
    }


    public void ProductResult(HttpContext context)
    {
        string result = string.Empty;
        string Method = context.Request["Method"];
        ProductRepository repository = new ProductRepository();

        switch (Method)
        {
            case "Add":
                Product item = new Product();
                item.CreateTime = DateTime.Now;
                item.ProductId = Guid.NewGuid();
                item.CreateBy = "Admin";
                int rows = repository.Add(item);
                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = rows > 0 ? "添加成功" : "添加失败"
                });
                break;
            case "Select":
                List<Product> list = repository.Select();

                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = string.Format("共{0}条数据", list.Count),
                    date = list
                });

                break;

        }
        context.Response.Write(result);
        context.Response.End();
    }



    public void ShuffleFigureResult(HttpContext context)
    {
        string result = string.Empty;
        string Method = context.Request["Method"];
        ShuffleFigureRepository repository = new ShuffleFigureRepository();

        switch (Method)
        {
            case "Add":
                ShuffleFigure item = new ShuffleFigure();
                item.CreateTime = DateTime.Now;
                item.ShuffleFigureId = Guid.NewGuid();
                item.CreateBy = "Admin";
                int rows = repository.Add(item);
                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = rows > 0 ? "添加成功" : "添加失败"
                });
                break;
            case "Select":
                List<ShuffleFigure> list = repository.Select();

                result = JsonConvert.SerializeObject(new
                {
                    code = 200,
                    message = string.Format("共{0}条数据", list.Count),
                    date = list
                });

                break;

        }
        context.Response.Write(result);
        context.Response.End();
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}