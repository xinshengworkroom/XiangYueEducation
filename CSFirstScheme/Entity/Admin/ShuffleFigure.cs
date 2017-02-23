using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSFirstScheme.Entity.Admin
{
    /// <summary>
    /// 轮播图
    /// </summary>
    public class ShuffleFigure
    {
        public Guid ShuffleFigureId { get; set; }

        public DateTime CreateTime { get; set; }

        public string CreateBy { get; set; }
    }
}
