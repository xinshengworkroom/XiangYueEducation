using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSFirstScheme.Entity.Admin
{
    /// <summary>
    /// 资讯
    /// </summary>
    public class Information
    {
        public Guid InformationId { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateBy { get; set; }
    }
}
